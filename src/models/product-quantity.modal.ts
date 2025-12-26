export interface ProductQuantityProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onQuantityChange?: (action: { type: string }) => void;
}