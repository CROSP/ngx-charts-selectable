/**
 * Generates a rounded rectanglar path
 *
 * @export
 * @param x, y, w, h, r, tl, tr, bl, br
 */
export function roundedRect(x, y, w, h, r, [tl, tr, bl, br]) {
    let retval = '';
    w = Math.floor(w);
    h = Math.floor(h);
    w = w === 0 ? 1 : w;
    h = h === 0 ? 1 : h;
    retval = `M${[x + r, y]}`;
    retval += `h${w - 2 * r}`;
    if (tr) {
        retval += `a${[r, r]} 0 0 1 ${[r, r]}`;
    }
    else {
        retval += `h${r}v${r}`;
    }
    retval += `v${h - 2 * r}`;
    if (br) {
        retval += `a${[r, r]} 0 0 1 ${[-r, r]}`;
    }
    else {
        retval += `v${r}h${-r}`;
    }
    retval += `h${2 * r - w}`;
    if (bl) {
        retval += `a${[r, r]} 0 0 1 ${[-r, -r]}`;
    }
    else {
        retval += `h${-r}v${-r}`;
    }
    retval += `v${2 * r - h}`;
    if (tl) {
        retval += `a${[r, r]} 0 0 1 ${[r, -r]}`;
    }
    else {
        retval += `v${-r}h${r}`;
    }
    retval += `z`;
    return retval;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGUuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9zaGFwZS5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUN6QixDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFZO0lBRTNCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVoQixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFCLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFFMUIsSUFBSSxFQUFFLEVBQUU7UUFDTixNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3hDO1NBQU07UUFDTCxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDeEI7SUFFRCxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBRTFCLElBQUksRUFBRSxFQUFFO1FBQ04sTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3pDO1NBQU07UUFDTCxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUN6QjtJQUVELE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFFMUIsSUFBSSxFQUFFLEVBQUU7UUFDTixNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUMxQztTQUFNO1FBQ0wsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUMxQjtJQUVELE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFFMUIsSUFBSSxFQUFFLEVBQUU7UUFDTixNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDekM7U0FBTTtRQUNMLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxJQUFJLEdBQUcsQ0FBQztJQUVkLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdlbmVyYXRlcyBhIHJvdW5kZWQgcmVjdGFuZ2xhciBwYXRoXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHgsIHksIHcsIGgsIHIsIHRsLCB0ciwgYmwsIGJyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZGVkUmVjdChcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG4gIHc6IG51bWJlcixcbiAgaDogbnVtYmVyLFxuICByOiBudW1iZXIsXG4gIFt0bCwgdHIsIGJsLCBicl06IGJvb2xlYW5bXVxuKTogc3RyaW5nIHtcbiAgbGV0IHJldHZhbCA9ICcnO1xuXG4gIHcgPSBNYXRoLmZsb29yKHcpO1xuICBoID0gTWF0aC5mbG9vcihoKTtcblxuICB3ID0gdyA9PT0gMCA/IDEgOiB3O1xuICBoID0gaCA9PT0gMCA/IDEgOiBoO1xuXG4gIHJldHZhbCA9IGBNJHtbeCArIHIsIHldfWA7XG4gIHJldHZhbCArPSBgaCR7dyAtIDIgKiByfWA7XG5cbiAgaWYgKHRyKSB7XG4gICAgcmV0dmFsICs9IGBhJHtbciwgcl19IDAgMCAxICR7W3IsIHJdfWA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dmFsICs9IGBoJHtyfXYke3J9YDtcbiAgfVxuXG4gIHJldHZhbCArPSBgdiR7aCAtIDIgKiByfWA7XG5cbiAgaWYgKGJyKSB7XG4gICAgcmV0dmFsICs9IGBhJHtbciwgcl19IDAgMCAxICR7Wy1yLCByXX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHZhbCArPSBgdiR7cn1oJHstcn1gO1xuICB9XG5cbiAgcmV0dmFsICs9IGBoJHsyICogciAtIHd9YDtcblxuICBpZiAoYmwpIHtcbiAgICByZXR2YWwgKz0gYGEke1tyLCByXX0gMCAwIDEgJHtbLXIsIC1yXX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHZhbCArPSBgaCR7LXJ9diR7LXJ9YDtcbiAgfVxuXG4gIHJldHZhbCArPSBgdiR7MiAqIHIgLSBofWA7XG5cbiAgaWYgKHRsKSB7XG4gICAgcmV0dmFsICs9IGBhJHtbciwgcl19IDAgMCAxICR7W3IsIC1yXX1gO1xuICB9IGVsc2Uge1xuICAgIHJldHZhbCArPSBgdiR7LXJ9aCR7cn1gO1xuICB9XG5cbiAgcmV0dmFsICs9IGB6YDtcblxuICByZXR1cm4gcmV0dmFsO1xufVxuIl19