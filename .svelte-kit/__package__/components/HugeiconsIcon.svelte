<script lang="ts">import { onMount } from 'svelte';
import { createHugeiconSingleton } from '../create-hugeicon-singleton';
let props = $props();
let svgElement;
let hugeiconAction = $state();
let cleanup = $state();
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
    if (!svgElement)
        return;
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