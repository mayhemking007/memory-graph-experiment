export const avg = (vector : number [][]) : number[] => {
    const len = vector[0]!.length;
    const result = new Array(len).fill(0);
    for(const vec of vector){
        for(let i = 0; i < vec.length; i++){
            result[i] += vec[i];
        }
    }
    return result.map((v) => (v/vector.length));
} 