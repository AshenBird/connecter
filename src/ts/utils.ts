export function jClone( simpleObject ){
  let r;
  const { stringify, parse } = JSON;
  try{
    r = parse(stringify(simpleObject));
  }catch( e ){
    throw e
  }
}