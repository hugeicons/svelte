<script lang="ts">
    import { onMount } from 'svelte';
    import type { IconSvgElement, HugeiconsProps } from '../create-hugeicon-singleton';
    import { createHugeiconSingleton } from '../create-hugeicon-singleton';
    import type { SVGAttributes } from 'svelte/elements'

    type Props = Omit<SVGAttributes<SVGSVGElement>, 'class'> & {
        icon: IconSvgElement;
        altIcon?: IconSvgElement;
        size?: string | number;
        strokeWidth?: number;
        absoluteStrokeWidth?: boolean;
        color?: string;
        showAlt?: boolean;
    }

    let { icon, altIcon, size, strokeWidth, absoluteStrokeWidth, color, showAlt, className, ...restProps }: Props = $props();

    let svgElement: SVGSVGElement;
    let hugeiconAction = $state<ReturnType<typeof createHugeiconSingleton>>();
    let cleanup = $state<{ update: (props: HugeiconsProps) => void; destroy: () => void }>();

    const propsForUpdate = $derived({
        size: size ?? 24,
        strokeWidth: strokeWidth,
        absoluteStrokeWidth: absoluteStrokeWidth ?? false,
        color: color ?? 'currentColor',
        altIcon: altIcon,
        showAlt: showAlt ?? false,
        class: className ?? ''
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
    width={size ?? 24}
    height={size ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    class={className}
    {...restProps}
>
    <!-- SVG content will be managed by the action -->
</svg>