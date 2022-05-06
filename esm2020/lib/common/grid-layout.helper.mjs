import { scaleBand } from 'd3-scale';
export function gridSize(dims, len, minWidth) {
    let rows = 1;
    let cols = len;
    const width = dims.width;
    if (width > minWidth) {
        while (width / cols < minWidth) {
            rows += 1;
            cols = Math.ceil(len / rows);
        }
    }
    return [cols, rows];
}
export function gridLayout(dims, data, minWidth, designatedTotal) {
    const xScale = scaleBand();
    const yScale = scaleBand();
    const width = dims.width;
    const height = dims.height;
    const [columns, rows] = gridSize(dims, data.length, minWidth);
    const xDomain = [];
    const yDomain = [];
    for (let i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (let i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    const res = [];
    const total = designatedTotal ? designatedTotal : getTotal(data);
    const cardWidth = xScale.bandwidth();
    const cardHeight = yScale.bandwidth();
    for (let i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i] ? data[i].name : '',
            value: data[i] ? data[i].value : undefined,
            extra: data[i] ? data[i].extra : undefined,
            label: data[i] ? data[i].label : ''
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = total > 0 ? res[i].data.value / total : 0;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results.map(d => (d ? d.value : 0)).reduce((sum, val) => sum + val, 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1sYXlvdXQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9ncmlkLWxheW91dC5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQXFCckMsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUFvQixFQUFFLEdBQVcsRUFBRSxRQUFnQjtJQUMxRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRXpCLElBQUksS0FBSyxHQUFHLFFBQVEsRUFBRTtRQUNwQixPQUFPLEtBQUssR0FBRyxJQUFJLEdBQUcsUUFBUSxFQUFFO1lBQzlCLElBQUksSUFBSSxDQUFDLENBQUM7WUFDVixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDOUI7S0FDRjtJQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQ3hCLElBQW9CLEVBQ3BCLElBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLGVBQXVCO0lBRXZCLE1BQU0sTUFBTSxHQUFRLFNBQVMsRUFBVSxDQUFDO0lBQ3hDLE1BQU0sTUFBTSxHQUFRLFNBQVMsRUFBVSxDQUFDO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUUzQixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxR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QUcsS0FBSyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsT0FBWTtJQUM1QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzY2FsZUJhbmQgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFN0cmluZ09yTnVtYmVyT3JEYXRlIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRJdGVtIHtcbiAgZGF0YTogR3JpZERhdGE7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcmlkRGF0YSB7XG4gIGV4dHJhPzogYW55O1xuICBsYWJlbDogc3RyaW5nO1xuICBuYW1lOiBTdHJpbmdPck51bWJlck9yRGF0ZTtcbiAgcGVyY2VudDogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xuICB2YWx1ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JpZFNpemUoZGltczogVmlld0RpbWVuc2lvbnMsIGxlbjogbnVtYmVyLCBtaW5XaWR0aDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGxldCByb3dzID0gMTtcbiAgbGV0IGNvbHMgPSBsZW47XG4gIGNvbnN0IHdpZHRoID0gZGltcy53aWR0aDtcblxuICBpZiAod2lkdGggPiBtaW5XaWR0aCkge1xuICAgIHdoaWxlICh3aWR0aCAvIGNvbHMgPCBtaW5XaWR0aCkge1xuICAgICAgcm93cyArPSAxO1xuICAgICAgY29scyA9IE1hdGguY2VpbChsZW4gLyByb3dzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW2NvbHMsIHJvd3NdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JpZExheW91dChcbiAgZGltczogVmlld0RpbWVuc2lvbnMsXG4gIGRhdGE6IEdyaWREYXRhW10sXG4gIG1pbldpZHRoOiBudW1iZXIsXG4gIGRlc2lnbmF0ZWRUb3RhbDogbnVtYmVyXG4pOiBHcmlkSXRlbVtdIHtcbiAgY29uc3QgeFNjYWxlOiBhbnkgPSBzY2FsZUJhbmQ8bnVtYmVyPigpO1xuICBjb25zdCB5U2NhbGU6IGFueSA9IHNjYWxlQmFuZDxudW1iZXI+KCk7XG4gIGNvbnN0IHdpZHRoID0gZGltcy53aWR0aDtcbiAgY29uc3QgaGVpZ2h0ID0gZGltcy5oZWlnaHQ7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHJvd3NdID0gZ3JpZFNpemUoZGltcywgZGF0YS5sZW5ndGgsIG1pbldpZHRoKTtcblxuICBjb25zdCB4RG9tYWluID0gW107XG4gIGNvbnN0IHlEb21haW4gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICB5RG9tYWluLnB1c2goaSk7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zOyBpKyspIHtcbiAgICB4RG9tYWluLnB1c2goaSk7XG4gIH1cbiAgeFNjYWxlLmRvbWFpbih4RG9tYWluKTtcbiAgeVNjYWxlLmRvbWFpbih5RG9tYWluKTtcblxuICB4U2NhbGUucmFuZ2VSb3VuZChbMCwgd2lkdGhdLCAwLjEpO1xuICB5U2NhbGUucmFuZ2VSb3VuZChbMCwgaGVpZ2h0XSwgMC4xKTtcblxuICBjb25zdCByZXMgPSBbXTtcbiAgY29uc3QgdG90YWwgPSBkZXNpZ25hdGVkVG90YWwgPyBkZXNpZ25hdGVkVG90YWwgOiBnZXRUb3RhbChkYXRhKTtcbiAgY29uc3QgY2FyZFdpZHRoID0geFNjYWxlLmJhbmR3aWR0aCgpO1xuICBjb25zdCBjYXJkSGVpZ2h0ID0geVNjYWxlLmJhbmR3aWR0aCgpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIHJlc1tpXSA9IHt9O1xuICAgIHJlc1tpXS5kYXRhID0ge1xuICAgICAgbmFtZTogZGF0YVtpXSA/IGRhdGFbaV0ubmFtZSA6ICcnLFxuICAgICAgdmFsdWU6IGRhdGFbaV0gPyBkYXRhW2ldLnZhbHVlIDogdW5kZWZpbmVkLFxuICAgICAgZXh0cmE6IGRhdGFbaV0gPyBkYXRhW2ldLmV4dHJhIDogdW5kZWZpbmVkLFxuICAgICAgbGFiZWw6IGRhdGFbaV0gPyBkYXRhW2ldLmxhYmVsIDogJydcbiAgICB9O1xuICAgIHJlc1tpXS54ID0geFNjYWxlKGkgJSBjb2x1bW5zKTtcbiAgICByZXNbaV0ueSA9IHlTY2FsZShNYXRoLmZsb29yKGkgLyBjb2x1bW5zKSk7XG4gICAgcmVzW2ldLndpZHRoID0gY2FyZFdpZHRoO1xuICAgIHJlc1tpXS5oZWlnaHQgPSBjYXJkSGVpZ2h0O1xuICAgIHJlc1tpXS5kYXRhLnBlcmNlbnQgPSB0b3RhbCA+IDAgPyByZXNbaV0uZGF0YS52YWx1ZSAvIHRvdGFsIDogMDtcbiAgICByZXNbaV0uZGF0YS50b3RhbCA9IHRvdGFsO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGdldFRvdGFsKHJlc3VsdHM6IGFueSk6IG51bWJlciB7XG4gIHJldHVybiByZXN1bHRzLm1hcChkID0+IChkID8gZC52YWx1ZSA6IDApKS5yZWR1Y2UoKHN1bSwgdmFsKSA9PiBzdW0gKyB2YWwsIDApO1xufVxuIl19