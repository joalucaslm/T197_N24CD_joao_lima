export interface SortOptionType {
  value: string;
  label: string;
}

export interface SortModalType {
  visible: boolean;
  orderBy: string;
  sortOptions: SortOptionType[];
  setOrderBy: (option: string) => void;
  closeModal: () => void;
}