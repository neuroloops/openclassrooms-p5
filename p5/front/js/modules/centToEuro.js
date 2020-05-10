function centToEuro(price) {
  let cent = price.slice(-2);
  let euro = price.slice(0, -2);

  return `${euro},${cent}€`;
}
