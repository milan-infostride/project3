const commanFunctions = {
    sanatizeWords: (words)=>{
        console.log(words);
      words = words.map((word)=>{
        return word.trim().toLowerCase();
      })
      console.log(words);
      words = words.filter((word=>{
        return word.search(/\w/g)<=0;
      }))
      console.log(words)
      return words;

    }
  }
export default commanFunctions;