module.exports = {
  format_date: date => {
    // formats the date into a more readable format
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    //changes the word to plural if there are more than 1
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  }
};