import useGet from '@/hooks/useGet';
import { cn } from '@/lib/utils';
import { getObjValue } from '@/lib/utils/func-1';
import { useEffect, useMemo } from 'react';
import { MultiSelect, SelectItem, SelectItemOrString } from './multiselect';
import { Skeleton } from '@/components/ui/skeleton';

interface AsyncMultiSelectProps<TValue extends SelectItemOrString> {
  dataSrc: string;
  /** accessorKey is the key of the object to be used as the value default is 'id' */
  accessorKey?: string;
  /** labelKey is the key of the object to be used as the label ex:
   *  {id: 1,name: 'John', act: {name: 'name'}} => labelKey = 'name' or 'act.name'
   *  */
  labelKey?: string;
  /** getLabel is a function that takes the data and returns the label to be displayed */
  getLabel?: (data: any) => string;
  accessorFn?: (data: any) => any;
  placeholder?: string;
  className?: string;
  value?: TValue[];
  onValueChange?: (value: SelectItem[]) => void;
  disabled?: boolean;
  maxItems?: number;
  queryKey?: string[];
}

/**
 * A customized MultiSelect component which fetches data from an api
 * @param props
 * @author Ndungutse Charles
 */
function AsyncMultiSelect<TValue extends SelectItemOrString>(props: AsyncMultiSelectProps<TValue>) {
  const {
    dataSrc,
    labelKey = 'name',
    accessorFn,
    value = [],
    accessorKey = 'id',
    getLabel,
    onValueChange,
    placeholder,
    className,
    disabled,
    maxItems,
    queryKey,
  } = props;

  const {
    data,
    isLoading: loading,
    refetch,
  } = useGet<any[]>(dataSrc, {
    defaultData: [],
    queryKey: queryKey,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log('value ==>', value);

  const getLabelFn = (data: any) => {
    if (getLabel) return getLabel(data);
    return getObjValue(data, labelKey) ?? accessorFn?.(data) ?? data?.toString();
  };

  const getOptions = () => {
    if (data) {
      return data.map((data: any) => {
        return {
          value: accessorFn ? accessorFn(data) : getObjValue(data, accessorKey),
          label: getLabelFn(data),
        };
      });
    }
    return [];
  };

  const selectData = useMemo(() => {
    const options = getOptions();
    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const loadingData: SelectItem[] = [{ value: 'loading', label: 'Loading...' }];

  const _value = useMemo(() => {
    if (typeof value[0] !== 'string') {
      return value;
    }
    return value.map((v) => {
      const data = selectData.find((d) => d.value === v);
      return {
        value: v as string,
        label: data?.label as string,
      };
    });
  }, [value]);

  if (loading) {
    return <Skeleton className="w-full h-10" />;
  }

  return (
    <MultiSelect
      items={loading ? loadingData : selectData}
      value={_value}
      onValueChange={onValueChange as (value: SelectItemOrString[]) => void}
      placeholder={placeholder}
      className={cn('w-full', className)}
      disabled={loading || disabled}
      maxItems={maxItems}
    />
  );
}

export default AsyncMultiSelect;
