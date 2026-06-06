import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { useTheme } from './theme-provider';

export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme}
      position="top-right"
      richColors
      {...props}
    />
  );
}
