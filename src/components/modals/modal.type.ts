export interface ModalProps {
    children: React.ReactNode;
    title?: string | React.ReactNode;
    size?: 'sm' | 'lg' | 'md';
    isVisible?: boolean;
}