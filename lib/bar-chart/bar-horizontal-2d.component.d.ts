import { EventEmitter, TemplateRef, TrackByFunction } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { BaseChartComponent } from '../common/base-chart.component';
import { ScaleType } from '../common/types/scale-type.enum';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
export declare class BarHorizontal2DComponent extends BaseChartComponent {
    legend: boolean;
    legendTitle: string;
    legendPosition: LegendPosition;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: boolean;
    showYAxisLabel: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
    tooltipDisabled: boolean;
    gradient: boolean;
    showGridLines: boolean;
    activeEntries: any[];
    schemeType: ScaleType;
    trimXAxisTicks: boolean;
    trimYAxisTicks: boolean;
    rotateXAxisTicks: boolean;
    maxXAxisTickLength: number;
    maxYAxisTickLength: number;
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
    xAxisTicks: any[];
    yAxisTicks: any[];
    groupPadding: number;
    barPadding: number;
    roundDomains: boolean;
    roundEdges: boolean;
    xScaleMax: number;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    noBarWhenZero: boolean;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    groupDomain: string[];
    innerDomain: string[];
    valueDomain: [number, number];
    groupScale: any;
    innerScale: any;
    valueScale: any;
    transform: string;
    colors: ColorHelper;
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    legendOptions: LegendOptions;
    dataLabelMaxWidth: any;
    barOrientation: typeof BarOrientation;
    update(): void;
    getGroupScale(): any;
    getInnerScale(): any;
    getValueScale(): any;
    getGroupDomain(): string[];
    getInnerDomain(): string[];
    getValueDomain(): [number, number];
    groupTransform(group: DataItem): string;
    onClick(data: any, group?: DataItem): void;
    trackBy: TrackByFunction<DataItem>;
    setColors(): void;
    getLegendOptions(): LegendOptions;
    updateYAxisWidth({ width }: {
        width: number;
    }): void;
    updateXAxisHeight({ height }: {
        height: number;
    }): void;
    onDataLabelMaxWidthChanged(event: any, groupIndex: number): void;
    onActivate(event: any, group: DataItem, fromLegend?: boolean): void;
    onDeactivate(event: any, group: DataItem, fromLegend?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BarHorizontal2DComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BarHorizontal2DComponent, "ngx-charts-bar-horizontal-2d", never, { "legend": "legend"; "legendTitle": "legendTitle"; "legendPosition": "legendPosition"; "xAxis": "xAxis"; "yAxis": "yAxis"; "showXAxisLabel": "showXAxisLabel"; "showYAxisLabel": "showYAxisLabel"; "xAxisLabel": "xAxisLabel"; "yAxisLabel": "yAxisLabel"; "tooltipDisabled": "tooltipDisabled"; "gradient": "gradient"; "showGridLines": "showGridLines"; "activeEntries": "activeEntries"; "schemeType": "schemeType"; "trimXAxisTicks": "trimXAxisTicks"; "trimYAxisTicks": "trimYAxisTicks"; "rotateXAxisTicks": "rotateXAxisTicks"; "maxXAxisTickLength": "maxXAxisTickLength"; "maxYAxisTickLength": "maxYAxisTickLength"; "xAxisTickFormatting": "xAxisTickFormatting"; "yAxisTickFormatting": "yAxisTickFormatting"; "xAxisTicks": "xAxisTicks"; "yAxisTicks": "yAxisTicks"; "groupPadding": "groupPadding"; "barPadding": "barPadding"; "roundDomains": "roundDomains"; "roundEdges": "roundEdges"; "xScaleMax": "xScaleMax"; "showDataLabel": "showDataLabel"; "dataLabelFormatting": "dataLabelFormatting"; "noBarWhenZero": "noBarWhenZero"; }, { "activate": "activate"; "deactivate": "deactivate"; }, ["tooltipTemplate"], never>;
}
