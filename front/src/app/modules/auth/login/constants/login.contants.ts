export const USER_TYPES: UserType[] = [
  { id: 0, name: 'Paciente' },
  { id: 1, name: 'Terapeuta' },
];

interface UserType {
  id: number;
  name: string;
}
