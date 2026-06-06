import {
  Check,
  LaptopMinimal,
  MoonStar,
  Palette,
  SunMedium,
} from 'lucide-react';
import { ColorTheme, ThemeMode } from '@modular-payments-console/contracts';
import { Button } from './button';
import {
  DropdownMenuGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { useTheme } from './theme-provider';

const themeIcons: Record<ThemeMode, typeof SunMedium> = {
  light: SunMedium,
  dark: MoonStar,
  system: LaptopMinimal,
};

const themeLabels: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const colorThemeOptions: Array<{
  value: ColorTheme;
  label: string;
  swatchClassName: string;
}> = [
  {
    value: 'default',
    label: 'Default',
    swatchClassName: 'bg-zinc-700 dark:bg-zinc-300',
  },
  {
    value: 'violet',
    label: 'Violet',
    swatchClassName: 'bg-violet-600 dark:bg-violet-400',
  },
  {
    value: 'red',
    label: 'Red',
    swatchClassName: 'bg-red-600 dark:bg-red-400',
  },
  {
    value: 'green',
    label: 'Green',
    swatchClassName: 'bg-emerald-600 dark:bg-emerald-400',
  },
  {
    value: 'blue',
    label: 'Blue',
    swatchClassName: 'bg-blue-600 dark:bg-blue-400',
  },
];

const activeColorSwatchClassName: Record<ColorTheme, string> = {
  default: 'bg-zinc-700 dark:bg-zinc-300',
  violet: 'bg-violet-600 dark:bg-violet-400',
  red: 'bg-red-600 dark:bg-red-400',
  green: 'bg-emerald-600 dark:bg-emerald-400',
  blue: 'bg-blue-600 dark:bg-blue-400',
};

export function ThemeModeToggle() {
  const { colorTheme, setColorTheme, theme, setTheme } = useTheme();
  const ActiveIcon = themeIcons[theme];
  const currentThemeLabel = themeLabels[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Current theme: ${currentThemeLabel}. Open theme preferences`}
          className="relative rounded-md border-border/70 bg-background/80"
        >
          <ActiveIcon />
          <span
            className={`${activeColorSwatchClassName[colorTheme]} absolute right-1.5 bottom-1.5 size-2 rounded-full border border-white/80 dark:border-zinc-950/80`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 rounded-md p-2">
        <DropdownMenuLabel className="px-2 py-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {(Object.keys(themeIcons) as ThemeMode[]).map(option => {
            const Icon = themeIcons[option];
            const isActive = theme === option;

            return (
              <DropdownMenuItem
                key={option}
                className="gap-3 rounded-md py-2.5"
                onSelect={event => {
                  event.preventDefault();
                  setTheme(option);
                }}
              >
                <Icon className="size-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{themeLabels[option]}</p>
                  <p className="text-xs text-muted-foreground">
                    {option === 'light'
                      ? 'Clear contrast for daytime operations.'
                      : option === 'dark'
                        ? 'Comfortable for focused, low-light work.'
                        : 'Follows the operating system preference.'}
                  </p>
                </div>
                {isActive ? <Check className="size-4 text-primary" /> : null}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="px-2 py-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">
          Primary Color
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 gap-2 px-1 pt-1 sm:grid-cols-3">
          {colorThemeOptions.map(option => {
            const isActive = colorTheme === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                variant={isActive ? 'secondary' : 'outline'}
                className="h-auto justify-start gap-2 rounded-md py-2"
                onClick={() => setColorTheme(option.value)}
              >
                <span
                  className={`${option.swatchClassName} size-3 rounded-full border border-black/10 dark:border-white/10`}
                />
                <span className="text-xs">{option.label}</span>
                {isActive ? <Check className="ml-auto size-3.5" /> : null}
              </Button>
            );
          })}
        </div>
        <div className="px-2 pt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Palette className="size-3.5" />
            Theme mode and primary color are shared across shell and remotes.
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
