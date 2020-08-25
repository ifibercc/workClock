export default (displaySymbol: any) => {
  const schema: any = {
    circle: {
      emptyChar: '○',
      passedChar: '●',
      halfChar: '◐',
      tiredChar: '◎',
    },
    mahjong: {
      emptyChar: '🀆',
      passedChar: '🀅',
      halfChar: '🀇',
      tiredChar: '🀂',
    }
  };
  return schema[displaySymbol];
};
