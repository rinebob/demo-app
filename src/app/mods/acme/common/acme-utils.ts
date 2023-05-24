import { Entity, EntityBase, Parcel } from "./interfaces-acme";


export function search<T extends EntityBase>(source: T[], term: string): T[] {
    // console.log('aU sP input search term, source: ', term, typeof term, source);

    // if no source , return empty array
    if (!source) return [];
    
    // if no search term , return source
    if (!term) return source;

    const searchTerm = term;

    let results:T[] = []

    // const keys = Object.keys(source[0]);
    // console.log('aU sP keys: ', keys);
    
    for (const entity of source) {
        // console.log('aU sP entity/name: ', entity, entity.displayName);
        // for (let value of Object.values(entity)) {
        for (let [key, value] of Object.entries(entity)) {
            // console.log('aU sP key/value: ', key, value, typeof value);
            
            if (typeof value !== 'string' && typeof value !== 'number') {
                // console.log('aU sP typeof not eq str or num. continue. value: ', value);

                continue;
            };

            if (value.toString().toLowerCase().includes(searchTerm)) {
                // console.log('aU sP value: ', value);
                results.push(entity);
                break;
            }
        }
        
    }
    // console.log('aU sP results: ', results);

    return results;

}