export function makeObjects(props, data) {
  const objs = data.map((dataItem)=> {
    const obj = {}
    props.forEach(((prop,i) => {
      obj[prop] = dataItem[i]
    }))
    return obj
  });
  return objs;
}