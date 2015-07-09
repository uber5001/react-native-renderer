export declare function iterableChangesAsString({collection, previous, additions, moves, removals}: {
    collection?: any[];
    previous?: any[];
    additions?: any[];
    moves?: any[];
    removals?: any[];
}): string;
export declare function kvChangesAsString({map, previous, additions, changes, removals}: {
    map?: List<any>;
    previous?: List<any>;
    additions?: List<any>;
    changes?: List<any>;
    removals?: List<any>;
}): string;
