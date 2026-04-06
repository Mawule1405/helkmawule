export interface Item{
    index : string,
    label: string,
    icon:string,
    isActive:boolean
}

export function emptyItem():Item{
    return {
        index:'',
        label:'',
        icon: '',
        isActive:false
    }
}