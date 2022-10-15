const movies = require("./data.js");

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const allDirectors = moviesArray.map((film) => {
    return film.director;
  });
  return allDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const spielbergMovies = moviesArray.filter((film) => {
    if (film.director === "Steven Spielberg" && film.genre.includes("Drama")) {
      return film;
    }
  });
  return spielbergMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) {
    return 0;
  }
  let moviesWithoutScore = 0;
  const average = moviesArray.reduce((acc, val) => {
    if (val.score) {
      return acc + val.score;
    }
    return acc;
    moviesWithoutScore++;
  }, 0);
  return (
    Math.round((average / (moviesArray.length - moviesWithoutScore)) * 100) /
    100
  );
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((film) => {
    return film.genre.includes("Drama");
  });
  if (!dramaMovies.length) {
    return 0;
  }
  const average = dramaMovies.reduce((acc, drama) => {
    return acc + drama.score;
  }, 0);
  return Math.round((average / dramaMovies.length) * 100) / 100;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesArrayCopy = [...moviesArray];
  moviesArrayCopy.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
  return moviesArrayCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesArrayCopy = [...moviesArray];
  const orderedAlphabetically = moviesArrayCopy.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const orderedTitles = orderedAlphabetically.map((film) => film.title);
  return orderedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const moviesArrayCopy = JSON.parse(JSON.stringify(moviesArray));
  const duration = moviesArrayCopy.map((film) => {
    let splitDuration = film.duration.split(" ");
    let filmHours = parseInt(splitDuration[0]) * 60;
    let filmMinutes = parseInt(splitDuration[1]);
    filmMinutes
      ? (film.duration = filmHours + filmMinutes)
      : (film.duration = filmHours);
    return film.duration;
  });
  return moviesArrayCopy;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) {
    return null;
  }
  const moviesArrayCopy = JSON.parse(JSON.stringify(moviesArray));

  // Create years and assign films
  const years = [];
  const sortByYear = moviesArrayCopy.map((film) => {
    years.push(film.year);
  });
  // Delete doubles
  const uniqueYears = Array.from(new Set(years));

  //   Transform into object
  const listOfYears = uniqueYears.reduce((acc, val) => {
    return { ...acc, [val]: ["là une valeur"] };
  }, {});
  console.log(listOfYears);

  //   Assign score to their year
  uniqueYears.map((year) => {
    moviesArrayCopy.map((film) => {
      if (film.year === year) {
        listOfYears[year].push(film.score);
      }
    });
    // Calc average per year
    const score = listOfYears[year].reduce((acc, val) => acc + val, 0);
    listOfYears[year] = (score / listOfYears[year].length).toFixed(2);
  });

  //   Find best score per year
  let array = Object.values(listOfYears);
  let bestAverage = Math.max(...array).toFixed(2);
  let bestYear = 0;
  for (const [key, value] of Object.entries(listOfYears)) {
    if (value === bestAverage) {
      bestYear = key;
    }
  }

  return `The best year was ${bestYear} with an average score of ${bestAverage}`;
}
