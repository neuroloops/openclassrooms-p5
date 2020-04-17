// export default function print(){ return console.log('hello world');}

export default function centToEuro(price) {
  let cent = price.slice(-2);
  let euro = price.slice(0, -2);

  return euro + "," + cent;
}
