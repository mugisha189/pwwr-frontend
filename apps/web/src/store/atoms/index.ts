import { User } from '@/lib/types/user';
import { atom } from 'jotai';

export const collapseAtom = atom(false);

export const showAddUserAtom = atom<{ open: boolean; data: User | null }>({
  open: false,
  data: null,
});

interface ShowViewUserModal {
  open: boolean;
  data: User | null;
}

export const showViewUserAtom = atom<ShowViewUserModal>({
  open: false,
  data: null,
});
