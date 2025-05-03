export interface FilterButtonType {
  visible: boolean;
  statusFilter: string;
  tribunalFilter: string;
  statusOptions: string[];
  tribunalOptions: string[];
  setStatusFilter: (status: string) => void;
  setTribunalFilter: (tribunal: string) => void;
  closeModal: () => void;
}

export interface FilterButtonsProps {
  openFilterModal: () => void;
  openSortModal: () => void;
}
