const defaultAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
};
const camelToKebab = (str) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};
export function createHugeiconSingleton(iconName, svgElements) {
    const renderIcon = (node, props) => {
        const { color = 'currentColor', size = 24, strokeWidth, absoluteStrokeWidth = false, class: className = '', altIcon, showAlt = false, ...rest } = props;
        const elementProps = {
            xmlns: 'http://www.w3.org/2000/svg',
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            color,
            class: className,
            ...rest
        };
        const currentIcon = showAlt && altIcon ? altIcon : svgElements;
        // Calculate stroke width if explicitly set
        const calculatedStrokeWidth = strokeWidth !== undefined
            ? (absoluteStrokeWidth ? (strokeWidth * (24 / Number(size))) : strokeWidth)
            : undefined;
        // Set SVG attributes
        Object.entries(elementProps).forEach(([key, value]) => {
            node.setAttribute(camelToKebab(key), String(value));
        });
        // Clear existing content
        node.innerHTML = '';
        // Create and append SVG children
        currentIcon.forEach(([tag, attrs]) => {
            const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
            const updatedAttrs = { ...attrs };
            if (calculatedStrokeWidth !== undefined) {
                updatedAttrs['stroke-width'] = calculatedStrokeWidth;
                updatedAttrs['stroke'] = 'currentColor';
            }
            Object.entries(updatedAttrs).forEach(([key, value]) => {
                element.setAttribute(camelToKebab(key), String(value));
            });
            node.appendChild(element);
        });
    };
    return {
        render(node, props) {
            renderIcon(node, props);
            return {
                update(newProps) {
                    renderIcon(node, newProps);
                },
                destroy() {
                    node.innerHTML = '';
                }
            };
        }
    };
}
