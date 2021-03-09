const {
  reFormatTimeStamp,
  createRef,
  renameKeys,
} = require('../db/utils/data-manipulation.js');

describe('reFormatTimeStamp', () => {
  it('it returns a string when passed a number ', () => {
    let input = 0;
    let expectedOutput = 'string';
    let actualOutput = reFormatTimeStamp(input);

    expect(typeof actualOutput).toEqual(expectedOutput);
  });

  it('returns date in day/month/year when passed 0', () => {
    let input = 0;
    let expectedOutput = '01/01/1970, 01:00:00';
    let actualOutput = reFormatTimeStamp(input);

    expect(actualOutput).toEqual(expectedOutput);
  });

  it('returns correct date in day/month/year when given unix code', () => {
    let input = 1511354163389;
    let expectedOutput = '22/11/2017, 12:36:03';
    let actualOutput = reFormatTimeStamp(input);

    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe('createRef', () => {
  it('returns an empty object, when passed an empty array', () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it('should return a lookup object when given an array with a single person object', () => {
    const input = [
      {
        owner_id: 10,
        forename: 'firstname-j',
        surname: 'lastname-j',
        age: 29,
      },
    ];
    const actual = createRef(input, 'forename', 'owner_id');
    const expected = { 'firstname-j': 10 };
    expect(actual).toEqual(expected);
  });

  it('should return a lookup object when given an array with > 1 person object', () => {
    let input = [
      {
        owner_id: 10,
        forename: 'firstname-j',
        surname: 'lastname-j',
        age: 29,
      },
      {
        owner_id: 11,
        forename: 'firstname-k',
        surname: 'lastname-k',
        age: 102,
      },
      {
        owner_id: 9,
        forename: 'firstname-i',
        surname: 'lastname-i',
        age: 63,
      },
    ];
    let actual = createRef(input, 'forename', 'owner_id');
    let expected = {
      'firstname-j': 10,
      'firstname-k': 11,
      'firstname-i': 9,
    };
    expect(actual).toEqual(expected);
  });

  it('should not mutate the given array', () => {
    let input = [
      {
        owner_id: 10,
        forename: 'firstname-j',
        surname: 'lastname-j',
        age: 29,
      },
      {
        owner_id: 11,
        forename: 'firstname-k',
        surname: 'lastname-k',
        age: 102,
      },
      {
        owner_id: 9,
        forename: 'firstname-i',
        surname: 'lastname-i',
        age: 63,
      },
    ];
    createRef(input);
    expect(input).toEqual([
      {
        owner_id: 10,
        forename: 'firstname-j',
        surname: 'lastname-j',
        age: 29,
      },
      {
        owner_id: 11,
        forename: 'firstname-k',
        surname: 'lastname-k',
        age: 102,
      },
      {
        owner_id: 9,
        forename: 'firstname-i',
        surname: 'lastname-i',
        age: 63,
      },
    ]);
  });
});

describe('renameKeys', () => {
  it('returns a new empty array, when passed an empty array', () => {
    const albums = [];
    const keyToChange = '';
    const newKey = '';
    const actual = renameKeys(albums, keyToChange, newKey);
    const expected = [];
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(albums);
  });
  it('should rename the given key of a single object in an array', () => {
    const books = [
      { title: 'Slaughterhouse-Five', writtenBy: 'Kurt Vonnegut' },
    ];

    expect(renameKeys(books, 'writtenBy', 'author')).toEqual([
      {
        title: 'Slaughterhouse-Five',
        author: 'Kurt Vonnegut',
      },
    ]);
  });
  it('should rename the given key of > 1 objects in an array', () => {
    const books = [
      { title: 'Slaughterhouse-Five', writtenBy: 'Kurt Vonnegut' },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key',
      },
    ];
    const keyToChange = 'writtenBy';
    const newKey = 'author';
    const expected = [
      { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut' },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        author: 'change my key',
      },
    ];
    expect(renameKeys(books, keyToChange, newKey)).toEqual(expected);
  });
  it('should not mutate the given list object', () => {
    const books = [
      { title: 'Slaughterhouse-Five', writtenBy: 'Kurt Vonnegut' },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key',
      },
    ];
    renameKeys(books, 'writtenBy', 'author');
    expect(books).toEqual([
      { title: 'Slaughterhouse-Five', writtenBy: 'Kurt Vonnegut' },
      {
        title: 'Blood Meridian',
        genre: 'anti-western',
        writtenBy: 'change my key',
      },
    ]);
  });
});
