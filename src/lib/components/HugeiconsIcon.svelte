<script lang="ts">
    import { onMount } from 'svelte';
    import type { IconSvgElement, HugeiconsProps } from '../create-hugeicon-singleton';
    import { createHugeiconSingleton } from '../create-hugeicon-singleton';

    let props = $props<{
        icon: IconSvgElement;
        altIcon?: IconSvgElement;
        size?: string | number;
        strokeWidth?: number;
        absoluteStrokeWidth?: boolean;
        color?: string;
        showAlt?: boolean;
        className?: string;
    }>();

    let svgElement: SVGSVGElement;
    let hugeiconAction = $state<ReturnType<typeof createHugeiconSingleton>>();
    let cleanup = $state<{ update: (props: HugeiconsProps) => void; destroy: () => void }>();

    const propsForUpdate = $derived({
        size: props.size ?? 24,
        strokeWidth: props.strokeWidth,
        absoluteStrokeWidth: props.absoluteStrokeWidth ?? false,
        color: props.color ?? 'currentColor',
        altIcon: props.altIcon,
        showAlt: props.showAlt ?? false,
        class: props.className ?? ''
    });

    onMount(() => {
        if (!svgElement) return;
        
        hugeiconAction = createHugeiconSingleton('HugeiconsIcon', props.icon);
        cleanup = hugeiconAction.render(svgElement, propsForUpdate);

        return () => {
            cleanup?.destroy();
        };
    });

    $effect(() => {
        if (hugeiconAction && svgElement && cleanup) {
            cleanup.update(propsForUpdate);
        }
    });
</script>

<svg 
    bind:this={svgElement}
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? 24}
    height={props.size ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    class={props.className}
>
    <!-- SVG content will be managed by the action -->
</svg>