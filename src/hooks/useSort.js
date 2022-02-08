import {useMemo} from "react";

export function useSort(array, sortMethod) {
  const {field, method} = sortMethod;
  return useMemo(() => {
    if (field) {
      return [...array].sort((a, b) => {
        if(typeof a[field] === 'number') {
          return method ? b[field] - a[field] : a[field] - b[field];
        }
        return method ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field])
      })
    }
    return array;
  }, [field, array, method])
}

export function useSortAndFilter(array, sortMethod, filterMethod) {
  const filteredArray = useMemo(() => {
    if(filterMethod) {
      return [...array].filter(item => item.user_rating === filterMethod);
    }
    return array;
  }, [filterMethod, array]);
  return useSort(filteredArray, sortMethod);
}