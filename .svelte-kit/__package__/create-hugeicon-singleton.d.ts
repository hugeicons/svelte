export type IconSvgElement = readonly (readonly [string, {
    readonly [key: string]: string | number;
}])[];
export interface HugeiconsProps extends Record<string, any> {
    size?: string | number;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    color?: string;
    class?: string;
    altIcon?: IconSvgElement;
    showAlt?: boolean;
}
export declare function createHugeiconSingleton(iconName: string, svgElements: IconSvgElement): {
    render(node: SVGSVGElement, props: HugeiconsProps): {
        update(newProps: HugeiconsProps): void;
        destroy(): void;
    };
};
