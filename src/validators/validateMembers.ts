import {Member} from '../types';

export function validateMembers(members: unknown): asserts members is Member[] {
  const membersAsType = members as Member[];

  if (typeof membersAsType.forEach !== 'function')
    throw new Error('Members data is not an array');

  membersAsType.forEach((member, index) => {
    if (typeof member.name !== 'string')
      throw new Error(
        `Member at index ${index} has name of wrong type. Expected string, found ${typeof member.name}`,
      );

    if (typeof member.bio !== 'string')
      throw new Error(
        `Member at index ${index} has bio of wrong type. Expected string, found ${typeof member.bio}`,
      );
  });
}
