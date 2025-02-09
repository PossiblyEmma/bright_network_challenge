import {validateMembers} from './validateMembers';

describe('validateMembers', () => {
  it('should throw an error if the members list is not an array', () => {
    const members = 'members list';
    expect(() => validateMembers(members)).toThrow(
      'Members data is not an array',
    );
  });
  it("should throw an error if a member's name is not a string", () => {
    const members = [
      {name: 'member 1', bio: "this is member 1's bio"},
      {bio: "this member doesn't have a name"},
    ];
    expect(() => validateMembers(members)).toThrow(
      'Member at index 1 has name of wrong type. Expected string, found undefined',
    );
  });
  it("should throw an error if a member's bio is not a string", () => {
    const members = [
      {name: 'member 1', bio: 1},
      {name: 'member 2', bio: "this is member 2's bio"},
    ];
    expect(() => validateMembers(members)).toThrow(
      'Member at index 0 has bio of wrong type. Expected string, found number',
    );
  });
  it('should not throw any errors if the members list is the correct type', () => {
    const members = [
      {name: 'member 1', bio: "this is member 1's bio"},
      {name: 'member 2', bio: "this is member 2's bio"},
    ];
    expect(() => validateMembers(members)).not.toThrow();
  });
});
