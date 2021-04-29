

export function CalculatePostRating( ratingList ){
    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let number4 = 0;
    let number5 = 0;

    ratingList.forEach(rating => {
        switch (rating.rating) {
          case 1:
            number1++;
            break;
          case 2:
            number2++;
            break;
          case 3:
            number3++;
            break;
          case 4:
            number4++;
            break;
          case 5:
            number5++;
            break;
        }
    })

    let rating  = (1*number1 + 2*number2 + 3*number3 + 4*number4 + 5*number5) / 5;
    return rating;
}

export function getNumberOfStars(ratingList) {
    const numberOfStars = {
      oneStar: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
    }

    ratingList.forEach(rating => {
      switch (rating.rating) {
        case 1:
         numberOfStars.oneStar++;
          break;
        case 2:
         numberOfStars.twoStars++;
          break;
        case 3:
         numberOfStars.threeStars++;
          break;
        case 4:
        numberOfStars.fourStars++;
          break;
        case 5:
         numberOfStars.fiveStars++;
        break;
      }
    })

    return numberOfStars;
  }

export default { CalculatePostRating, getNumberOfStars };
