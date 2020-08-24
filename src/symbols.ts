export default (displaySymbol: any) => {
  const schema: any = {
    circle: {
      emptyChar: '○',
      passedChar: '●',
      tiredChar: '◎'
    },
    mahjong: {
      emptyChar: '🀆',
      passedChar: '🀅',
      tiredChar: '🀂'
    }
  };
  return schema[displaySymbol];
};
