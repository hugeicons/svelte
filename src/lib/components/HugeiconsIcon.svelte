<script lang="ts">
    import { onMount } from 'svelte';
    import type { IconSvgElement, HugeiconsProps } from '../create-hugeicon-singleton';
    import { createHugeiconSingleton } from '../create-hugeicon-singleton';

    interface Props {
        icon: IconSvgElement;
        altIcon?: IconSvgElement;
        size?: string | number;
        strokeWidth?: number;
        absoluteStrokeWidth?: boolean;
        color?: string;
        showAlt?: boolean;
        className?: string;
    }

    let {
        icon,
        altIcon,
        size = 24,
        strokeWidth,
        absoluteStrokeWidth = false,
        color = 'currentColor',
        showAlt = false,
        className = ''
    }: Props = $props();

    let svgElement: SVGSVGElement;
    let hugeiconAction = $state<ReturnType<typeof createHugeiconSingleton>>();
    let cleanup = $state<{ update: (props: HugeiconsProps) => void; destroy: () => void }>();

    const propsForUpdate = $derived({
        size,
        strokeWidth,
        absoluteStrokeWidth,
        color,
        altIcon,
        showAlt,
        class: className
    });

    onMount(() => {
        if (!svgElement) return;
        
        hugeiconAction = createHugeiconSingleton('HugeiconsIcon', icon);
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
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    class={className}
>
    <!-- SVG content will be managed by the action -->
</svg>
