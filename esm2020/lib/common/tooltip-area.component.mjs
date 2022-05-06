import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createMouseEvent } from '../events';
import { isPlatformBrowser } from '@angular/common';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { ScaleType } from './types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./tooltip/tooltip.directive";
export class TooltipArea {
    constructor(platformId) {
        this.platformId = platformId;
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.placementTypes = PlacementTypes;
        this.styleTypes = StyleTypes;
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    getValues(xVal, yVal) {
        const results = [];
        let minDiff = Number.MAX_VALUE;
        let closestIndex;
        for (const group of this.results) {
            const item = group.series.find(d => d.name.toString() === xVal.toString());
            let groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                const label = item.name;
                let val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                let color;
                if (this.colors.scaleType === ScaleType.Linear) {
                    let v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                const curDiff = Math.abs(this.yScale(val) - yVal);
                if (curDiff < minDiff) {
                    minDiff = curDiff;
                    closestIndex = Object.assign({}, item, {
                        value: val,
                        name: label,
                        series: groupName,
                        min: item.min,
                        max: item.max,
                        color
                    });
                    ;
                }
            }
        }
        results.push(closestIndex);
        return results;
    }
    mouseMove(event) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const xPos = event.pageX - event.target.getBoundingClientRect().left;
        const yPos = event.pageY - event.target.getBoundingClientRect().top;
        const closestIndex = this.findClosestPointIndex(xPos);
        const closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint, yPos);
        const ev = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(ev);
        this.anchorOpacity = 0.7;
        this.hover.emit({
            value: this.anchorValues[0].value,
            series: this.anchorValues[0].series,
            name: this.anchorValues[0].name
        });
        this.lastAnchorPos = this.anchorPos;
    }
    defaultEvent(index, offset) {
        this.anchorPos = this.xScale(index) - offset;
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(index, 163);
        const ev = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(ev);
        this.anchorOpacity = 0.7;
        this.hover.emit({
            value: this.anchorValues[0].value,
            series: this.anchorValues[0].series,
            name: this.anchorValues[0].name
        });
        this.lastAnchorPos = this.anchorPos;
    }
    findClosestPointIndex(xPos) {
        let minIndex = 0;
        let maxIndex = this.xSet.length - 1;
        let minDiff = Number.MAX_VALUE;
        let closestIndex = 0;
        while (minIndex <= maxIndex) {
            const currentIndex = ((minIndex + maxIndex) / 2) | 0;
            const currentElement = this.xScale(this.xSet[currentIndex]);
            const curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    }
    showTooltip() {
        const event = createMouseEvent('mouseenter');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
    }
    hideTooltip() {
        const event = createMouseEvent('mouseleave');
        this.tooltipAnchor.nativeElement.dispatchEvent(event);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    }
    getToolTipText(tooltipItem) {
        let result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    }
}
TooltipArea.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipArea, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
TooltipArea.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.0", type: TooltipArea, selector: "g[ngx-charts-tooltip-area]", inputs: { dims: "dims", xSet: "xSet", xScale: "xScale", yScale: "yScale", results: "results", colors: "colors", showPercentage: "showPercentage", tooltipDisabled: "tooltipDisabled", tooltipTemplate: "tooltipTemplate" }, outputs: { hover: "hover" }, viewQueries: [{ propertyName: "tooltipAnchor", first: true, predicate: ["tooltipAnchor"], descendants: true }], ngImport: i0, template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.TooltipDirective, selector: "[ngx-tooltip]", inputs: ["tooltipCssClass", "tooltipTitle", "tooltipAppendToBody", "tooltipSpacing", "tooltipDisabled", "tooltipShowCaret", "tooltipPlacement", "tooltipAlignment", "tooltipType", "tooltipCloseOnClickOutside", "tooltipCloseOnMouseLeave", "tooltipHideTimeout", "tooltipShowTimeout", "tooltipTemplate", "tooltipShowEvent", "tooltipContext", "tooltipImmediateExit"], outputs: ["show", "hide"] }], animations: [
        trigger('animationState', [
            transition('inactive => active', [
                style({
                    opacity: 0
                }),
                animate(250, style({ opacity: 0.7 }))
            ]),
            transition('active => inactive', [
                style({
                    opacity: 0.7
                }),
                animate(250, style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: TooltipArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-tooltip-area]',
                    template: `
    <svg:g>
      <svg:rect
        class="tooltip-area"
        [attr.x]="0"
        y="0"
        [attr.width]="dims.width"
        [attr.height]="dims.height"
        style="opacity: 0; cursor: 'auto';"
        (mousemove)="mouseMove($event)"
        (mouseleave)="hideTooltip()"
      />
      <ng-template #defaultTooltipTemplate let-model="model">
        <xhtml:div class="area-tooltip-container">
          <xhtml:div *ngFor="let tooltipItem of model" class="tooltip-item">
            <xhtml:span class="tooltip-item-color" [style.background-color]="tooltipItem.color"></xhtml:span>
            {{ getToolTipText(tooltipItem) }}
          </xhtml:div>
        </xhtml:div>
      </ng-template>
      <svg:rect
        #tooltipAnchor
        [@animationState]="anchorOpacity !== 0 ? 'active' : 'inactive'"
        class="tooltip-anchor"
        [attr.x]="anchorPos"
        y="0"
        [attr.width]="1"
        [attr.height]="dims.height"
        [style.opacity]="anchorOpacity"
        [style.pointer-events]="'none'"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Right"
        [tooltipType]="styleTypes.tooltip"
        [tooltipSpacing]="15"
        [tooltipTemplate]="tooltipTemplate ? tooltipTemplate : defaultTooltipTemplate"
        [tooltipContext]="anchorValues"
        [tooltipImmediateExit]="true"
      />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition('inactive => active', [
                                style({
                                    opacity: 0
                                }),
                                animate(250, style({ opacity: 0.7 }))
                            ]),
                            transition('active => inactive', [
                                style({
                                    opacity: 0.7
                                }),
                                animate(250, style({ opacity: 0 }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { dims: [{
                type: Input
            }], xSet: [{
                type: Input
            }], xScale: [{
                type: Input
            }], yScale: [{
                type: Input
            }], results: [{
                type: Input
            }], colors: [{
                type: Input
            }], showPercentage: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], hover: [{
                type: Output
            }], tooltipAnchor: [{
                type: ViewChild,
                args: ['tooltipAnchor', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vdG9vbHRpcC1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFDVCx1QkFBdUIsRUFFdkIsV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBMEVwRCxNQUFNLE9BQU8sV0FBVztJQXVCdEIsWUFBeUMsVUFBZTtRQUFmLGVBQVUsR0FBVixVQUFVLENBQUs7UUF0QnhELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2QixpQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUc3QixtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBUWYsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHaEMsVUFBSyxHQUF5RCxJQUFJLFlBQVksRUFBRSxDQUFDO0lBSzNGLENBQUM7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Q0FBQyxDQUFDOzZCQUNwQyxDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7OzBCQXdCYyxNQUFNOzJCQUFDLFdBQVc7NENBZHRCLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUVJLEtBQUs7c0JBQWQsTUFBTTtnQkFFd0MsYUFBYTtzQkFBM0QsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGNyZWF0ZU1vdXNlRXZlbnQgfSBmcm9tICcuLi9ldmVudHMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi90b29sdGlwL3Bvc2l0aW9uJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuL3Rvb2x0aXAvc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcblxuZXhwb3J0IGludGVyZmFjZSBUb29sdGlwIHtcbiAgY29sb3I6IHN0cmluZztcbiAgZDA6IG51bWJlcjtcbiAgZDE6IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG1pbjogbnVtYmVyO1xuICBuYW1lOiBhbnk7XG4gIHNlcmllczogYW55O1xuICB2YWx1ZTogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtdG9vbHRpcC1hcmVhXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgIGNsYXNzPVwidG9vbHRpcC1hcmVhXCJcbiAgICAgICAgW2F0dHIueF09XCIwXCJcbiAgICAgICAgeT1cIjBcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJkaW1zLndpZHRoXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgc3R5bGU9XCJvcGFjaXR5OiAwOyBjdXJzb3I6ICdhdXRvJztcIlxuICAgICAgICAobW91c2Vtb3ZlKT1cIm1vdXNlTW92ZSgkZXZlbnQpXCJcbiAgICAgICAgKG1vdXNlbGVhdmUpPVwiaGlkZVRvb2x0aXAoKVwiXG4gICAgICAvPlxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0VG9vbHRpcFRlbXBsYXRlIGxldC1tb2RlbD1cIm1vZGVsXCI+XG4gICAgICAgIDx4aHRtbDpkaXYgY2xhc3M9XCJhcmVhLXRvb2x0aXAtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHhodG1sOmRpdiAqbmdGb3I9XCJsZXQgdG9vbHRpcEl0ZW0gb2YgbW9kZWxcIiBjbGFzcz1cInRvb2x0aXAtaXRlbVwiPlxuICAgICAgICAgICAgPHhodG1sOnNwYW4gY2xhc3M9XCJ0b29sdGlwLWl0ZW0tY29sb3JcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJ0b29sdGlwSXRlbS5jb2xvclwiPjwveGh0bWw6c3Bhbj5cbiAgICAgICAgICAgIHt7IGdldFRvb2xUaXBUZXh0KHRvb2x0aXBJdGVtKSB9fVxuICAgICAgICAgIDwveGh0bWw6ZGl2PlxuICAgICAgICA8L3hodG1sOmRpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgI3Rvb2x0aXBBbmNob3JcbiAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCJhbmNob3JPcGFjaXR5ICE9PSAwID8gJ2FjdGl2ZScgOiAnaW5hY3RpdmUnXCJcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwLWFuY2hvclwiXG4gICAgICAgIFthdHRyLnhdPVwiYW5jaG9yUG9zXCJcbiAgICAgICAgeT1cIjBcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCIxXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3N0eWxlLm9wYWNpdHldPVwiYW5jaG9yT3BhY2l0eVwiXG4gICAgICAgIFtzdHlsZS5wb2ludGVyLWV2ZW50c109XCInbm9uZSdcIlxuICAgICAgICBuZ3gtdG9vbHRpcFxuICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInBsYWNlbWVudFR5cGVzLlJpZ2h0XCJcbiAgICAgICAgW3Rvb2x0aXBUeXBlXT1cInN0eWxlVHlwZXMudG9vbHRpcFwiXG4gICAgICAgIFt0b29sdGlwU3BhY2luZ109XCIxNVwiXG4gICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdG9vbHRpcFRlbXBsYXRlIDogZGVmYXVsdFRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJhbmNob3JWYWx1ZXNcIlxuICAgICAgICBbdG9vbHRpcEltbWVkaWF0ZUV4aXRdPVwidHJ1ZVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCdpbmFjdGl2ZSA9PiBhY3RpdmUnLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAwLjcgfSkpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJ2FjdGl2ZSA9PiBpbmFjdGl2ZScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHk6IDAuN1xuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwQXJlYSB7XG4gIGFuY2hvck9wYWNpdHk6IG51bWJlciA9IDA7XG4gIGFuY2hvclBvczogbnVtYmVyID0gLTE7XG4gIGFuY2hvclZhbHVlczogVG9vbHRpcFtdID0gW107XG4gIGxhc3RBbmNob3JQb3M6IG51bWJlcjtcblxuICBwbGFjZW1lbnRUeXBlcyA9IFBsYWNlbWVudFR5cGVzO1xuICBzdHlsZVR5cGVzID0gU3R5bGVUeXBlcztcblxuICBASW5wdXQoKSBkaW1zOiBWaWV3RGltZW5zaW9ucztcbiAgQElucHV0KCkgeFNldDogYW55W107XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSByZXN1bHRzOiBhbnlbXTtcbiAgQElucHV0KCkgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgQElucHV0KCkgc2hvd1BlcmNlbnRhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgaG92ZXI6IEV2ZW50RW1pdHRlcjx7IHZhbHVlOiBhbnksIHNlcmllczogYW55LCBuYW1lOiBhbnkgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgndG9vbHRpcEFuY2hvcicsIHsgc3RhdGljOiBmYWxzZSB9KSB0b29sdGlwQW5jaG9yO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XG4gIH1cblxuICBnZXRWYWx1ZXMoeFZhbCwgeVZhbCk6IFRvb2x0aXBbXSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGxldCBtaW5EaWZmID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICBsZXQgY2xvc2VzdEluZGV4O1xuXG4gICAgZm9yIChjb25zdCBncm91cCBvZiB0aGlzLnJlc3VsdHMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBncm91cC5zZXJpZXMuZmluZChkID0+IGQubmFtZS50b1N0cmluZygpID09PSB4VmFsLnRvU3RyaW5nKCkpO1xuICAgICAgbGV0IGdyb3VwTmFtZSA9IGdyb3VwLm5hbWU7XG4gICAgICBpZiAoZ3JvdXBOYW1lIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBncm91cE5hbWUgPSBncm91cE5hbWUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gaXRlbS5uYW1lO1xuICAgICAgICBsZXQgdmFsID0gaXRlbS52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1BlcmNlbnRhZ2UpIHtcbiAgICAgICAgICB2YWwgPSAoaXRlbS5kMSAtIGl0ZW0uZDApLnRvRml4ZWQoMikgKyAnJSc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbG9yO1xuICAgICAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICAgICAgbGV0IHYgPSB2YWw7XG4gICAgICAgICAgaWYgKGl0ZW0uZDEpIHtcbiAgICAgICAgICAgIHYgPSBpdGVtLmQxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbG9yID0gdGhpcy5jb2xvcnMuZ2V0Q29sb3IoZ3JvdXAubmFtZSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgY29uc3QgY3VyRGlmZiA9IE1hdGguYWJzKHRoaXMueVNjYWxlKHZhbCkgLSB5VmFsKTtcblxuICAgICAgICBpZiAoY3VyRGlmZiA8IG1pbkRpZmYpIHtcbiAgICAgICAgICBtaW5EaWZmID0gY3VyRGlmZjtcbiAgICAgICAgICBjbG9zZXN0SW5kZXggPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtLCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgICAgbmFtZTogbGFiZWwsXG4gICAgICAgICAgICBzZXJpZXM6IGdyb3VwTmFtZSxcbiAgICAgICAgICAgIG1pbjogaXRlbS5taW4sXG4gICAgICAgICAgICBtYXg6IGl0ZW0ubWF4LFxuICAgICAgICAgICAgY29sb3JcbiAgICAgICAgICB9KTs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcmVzdWx0cy5wdXNoKGNsb3Nlc3RJbmRleCk7XG5cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgbW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeFBvcyA9IGV2ZW50LnBhZ2VYIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgY29uc3QgeVBvcyA9IGV2ZW50LnBhZ2VZIC0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgIGNvbnN0IGNsb3Nlc3RJbmRleCA9IHRoaXMuZmluZENsb3Nlc3RQb2ludEluZGV4KHhQb3MpO1xuICAgIGNvbnN0IGNsb3Nlc3RQb2ludCA9IHRoaXMueFNldFtjbG9zZXN0SW5kZXhdO1xuICAgIHRoaXMuYW5jaG9yUG9zID0gdGhpcy54U2NhbGUoY2xvc2VzdFBvaW50KTtcbiAgICB0aGlzLmFuY2hvclBvcyA9IE1hdGgubWF4KDAsIHRoaXMuYW5jaG9yUG9zKTtcbiAgICB0aGlzLmFuY2hvclBvcyA9IE1hdGgubWluKHRoaXMuZGltcy53aWR0aCwgdGhpcy5hbmNob3JQb3MpO1xuXG4gICAgdGhpcy5hbmNob3JWYWx1ZXMgPSB0aGlzLmdldFZhbHVlcyhjbG9zZXN0UG9pbnQsIHlQb3MpO1xuICAgIGNvbnN0IGV2ID0gY3JlYXRlTW91c2VFdmVudCgnbW91c2VsZWF2ZScpO1xuICAgIHRoaXMudG9vbHRpcEFuY2hvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDAuNztcbiAgICB0aGlzLmhvdmVyLmVtaXQoe1xuICAgICAgdmFsdWU6IHRoaXMuYW5jaG9yVmFsdWVzWzBdLnZhbHVlLFxuICAgICAgc2VyaWVzOiB0aGlzLmFuY2hvclZhbHVlc1swXS5zZXJpZXMsXG4gICAgICBuYW1lOiB0aGlzLmFuY2hvclZhbHVlc1swXS5uYW1lXG4gICAgfSk7XG4gICAgdGhpcy5sYXN0QW5jaG9yUG9zID0gdGhpcy5hbmNob3JQb3M7XG5cbiAgfVxuXG4gIHB1YmxpYyBkZWZhdWx0RXZlbnQoaW5kZXg6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcblxuICAgIHRoaXMuYW5jaG9yUG9zID0gdGhpcy54U2NhbGUoaW5kZXgpIC0gb2Zmc2V0O1xuICAgIHRoaXMuYW5jaG9yUG9zID0gTWF0aC5tYXgoMCwgdGhpcy5hbmNob3JQb3MpO1xuICAgIHRoaXMuYW5jaG9yUG9zID0gTWF0aC5taW4odGhpcy5kaW1zLndpZHRoLCB0aGlzLmFuY2hvclBvcyk7XG5cbiAgICB0aGlzLmFuY2hvclZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKGluZGV4LCAxNjMpO1xuICAgIGNvbnN0IGV2ID0gY3JlYXRlTW91c2VFdmVudCgnbW91c2VsZWF2ZScpO1xuICAgIHRoaXMudG9vbHRpcEFuY2hvci5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgIHRoaXMuYW5jaG9yT3BhY2l0eSA9IDAuNztcbiAgICB0aGlzLmhvdmVyLmVtaXQoe1xuICAgICAgdmFsdWU6IHRoaXMuYW5jaG9yVmFsdWVzWzBdLnZhbHVlLFxuICAgICAgc2VyaWVzOiB0aGlzLmFuY2hvclZhbHVlc1swXS5zZXJpZXMsXG4gICAgICBuYW1lOiB0aGlzLmFuY2hvclZhbHVlc1swXS5uYW1lXG4gICAgfSk7XG4gICAgdGhpcy5sYXN0QW5jaG9yUG9zID0gdGhpcy5hbmNob3JQb3M7XG5cbiAgfVxuXG4gIGZpbmRDbG9zZXN0UG9pbnRJbmRleCh4UG9zOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBtaW5JbmRleCA9IDA7XG4gICAgbGV0IG1heEluZGV4ID0gdGhpcy54U2V0Lmxlbmd0aCAtIDE7XG4gICAgbGV0IG1pbkRpZmYgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIGxldCBjbG9zZXN0SW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSAoKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMikgfCAwO1xuICAgICAgY29uc3QgY3VycmVudEVsZW1lbnQgPSB0aGlzLnhTY2FsZSh0aGlzLnhTZXRbY3VycmVudEluZGV4XSk7XG5cbiAgICAgIGNvbnN0IGN1ckRpZmYgPSBNYXRoLmFicyhjdXJyZW50RWxlbWVudCAtIHhQb3MpO1xuXG4gICAgICBpZiAoY3VyRGlmZiA8IG1pbkRpZmYpIHtcbiAgICAgICAgbWluRGlmZiA9IGN1ckRpZmY7XG4gICAgICAgIGNsb3Nlc3RJbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50IDwgeFBvcykge1xuICAgICAgICBtaW5JbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFbGVtZW50ID4geFBvcykge1xuICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaW5EaWZmID0gMDtcbiAgICAgICAgY2xvc2VzdEluZGV4ID0gY3VycmVudEluZGV4O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xvc2VzdEluZGV4O1xuICB9XG5cbiAgc2hvd1Rvb2x0aXAoKTogdm9pZCB7XG4gICAgY29uc3QgZXZlbnQgPSBjcmVhdGVNb3VzZUV2ZW50KCdtb3VzZWVudGVyJyk7XG4gICAgdGhpcy50b29sdGlwQW5jaG9yLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBoaWRlVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudCA9IGNyZWF0ZU1vdXNlRXZlbnQoJ21vdXNlbGVhdmUnKTtcbiAgICB0aGlzLnRvb2x0aXBBbmNob3IubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLmFuY2hvck9wYWNpdHkgPSAwO1xuICAgIHRoaXMubGFzdEFuY2hvclBvcyA9IC0xO1xuICB9XG5cbiAgZ2V0VG9vbFRpcFRleHQodG9vbHRpcEl0ZW06IFRvb2x0aXApOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICcnO1xuICAgIGlmICh0b29sdGlwSXRlbS5zZXJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLnNlcmllcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ICs9ICc/Pz8nO1xuICAgIH1cbiAgICByZXN1bHQgKz0gJzogJztcbiAgICBpZiAodG9vbHRpcEl0ZW0udmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9IHRvb2x0aXBJdGVtLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh0b29sdGlwSXRlbS5taW4gIT09IHVuZGVmaW5lZCB8fCB0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ICs9ICcgKCc7XG4gICAgICBpZiAodG9vbHRpcEl0ZW0ubWluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRvb2x0aXBJdGVtLm1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICfiiaUnO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSB0b29sdGlwSXRlbS5taW4udG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzdWx0ICs9ICcgLSAnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRvb2x0aXBJdGVtLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSAn4omkJztcbiAgICAgIH1cbiAgICAgIGlmICh0b29sdGlwSXRlbS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQgKz0gdG9vbHRpcEl0ZW0ubWF4LnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gJyknO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=