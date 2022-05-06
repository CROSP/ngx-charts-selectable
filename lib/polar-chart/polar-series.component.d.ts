import { OnChanges, SimpleChanges, TemplateRef, EventEmitter } from '@angular/core';
import { Series, DataItem } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
interface PolarChartCircle {
    color: string;
    cx: number;
    cy: number;
    data: Series;
    label: string;
    value: number;
}
export declare class PolarSeriesComponent implements OnChanges {
    name: any;
    data: any;
    xScale: any;
    yScale: any;
    colors: any;
    scaleType: any;
    curve: any;
    activeEntries: any[];
    rangeFillOpacity: number;
    tooltipDisabled: boolean;
    tooltipText: (o: any) => string;
    gradient: boolean;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    path: string;
    circles: PolarChartCircle[];
    circleRadius: number;
    areaPath: string;
    gradientId: string;
    gradientUrl: string;
    hasGradient: boolean;
    gradientStops: any[];
    areaGradientStops: any[];
    seriesColor: string;
    active: boolean;
    inactive: boolean;
    barOrientation: typeof BarOrientation;
    placementTypes: typeof PlacementTypes;
    styleTypes: typeof StyleTypes;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getAngle(d: DataItem): any;
    getRadius(d: DataItem): any;
    getLineGenerator(): any;
    sortData(data: DataItem): any[];
    isActive(entry: DataItem): boolean;
    isInactive(entry: DataItem): boolean;
    defaultTooltipText({ label, value }: {
        label: string;
        value: number;
    }): string;
    updateGradients(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PolarSeriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PolarSeriesComponent, "g[ngx-charts-polar-series]", never, { "name": "name"; "data": "data"; "xScale": "xScale"; "yScale": "yScale"; "colors": "colors"; "scaleType": "scaleType"; "curve": "curve"; "activeEntries": "activeEntries"; "rangeFillOpacity": "rangeFillOpacity"; "tooltipDisabled": "tooltipDisabled"; "tooltipText": "tooltipText"; "gradient": "gradient"; "tooltipTemplate": "tooltipTemplate"; "animations": "animations"; }, { "select": "select"; "activate": "activate"; "deactivate": "deactivate"; }, never, never>;
}
export {};
