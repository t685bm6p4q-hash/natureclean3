import { cn } from '@/app/components/ui/utils';

export type BulletListLine =
  | string
  | {
      bold: string;
      text?: string;
      id?: string;
    };

export interface BulletListProps {
  lines: readonly BulletListLine[];
  className?: string;
  itemClassName?: string;
  bulletClassName?: string;
}

/** Puces • serrées au texte — listes prestations et pages services */
export function BulletList({
  lines,
  className,
  itemClassName,
  bulletClassName = 'text-green-600',
}: BulletListProps) {
  return (
    <ul className={cn('m-0 list-none space-y-1.5 p-0', className)}>
      {lines.map((line, index) => {
        const key =
          typeof line === 'string' ? line : (line.id ?? line.bold ?? String(index));
        return (
          <li
            key={key}
            className={cn(
              'flex items-start gap-1.5 text-sm text-gray-700 leading-snug',
              itemClassName,
            )}
          >
            <span className={cn('shrink-0 pt-px', bulletClassName)} aria-hidden="true">
              •
            </span>
            <span>
              {typeof line === 'string' ? (
                line
              ) : (
                <>
                  <strong>{line.bold}</strong>
                  {line.text ? (
                    <>
                      {line.text.startsWith(' ') || line.text.startsWith('—')
                        ? line.text
                        : ` ${line.text}`}
                    </>
                  ) : null}
                </>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
