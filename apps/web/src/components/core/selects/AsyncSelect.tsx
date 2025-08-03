import useGet from '@/hooks/useGet';
import { getObjValue } from '@/lib/utils/func-1';
import { SelectProps } from '@radix-ui/react-select';
import { useEffect, useMemo } from 'react';
import { ComboBox } from './ComboBox';
import { SelectData } from '.';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AsyncSelectProps extends SelectProps {
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
  comboBox?: boolean;
  queryKey?: string[];
}

/**
 * A customized shadcnui select which fetches data from an api
 * @param props
 * @author Ndungutse Charles
 */
const AsyncSelect = (props: AsyncSelectProps) => {
  const {
    dataSrc,
    labelKey = 'name',
    accessorFn,
    value,
    accessorKey = 'id',
    getLabel,
    onValueChange,
    placeholder,
    className,
    comboBox = true,
    queryKey,
    ...rest
  } = props;
  const {
    data,
    isLoading: loading,
    refetch,
  } = useGet<any[]>(dataSrc, {
    defaultData: [],
    onMount: false,
    queryKey: queryKey,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = useMemo(() => {
    return value;
  }, [value]);

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
    // console.log('options ==>', options);
    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const loadingData: SelectData[] = [{ value: 'loading', label: 'Loading...', disabled: true }];
  // console.log('selectData ==>', selectData);

  return (
    <>
      {comboBox ? (
        <ComboBox
          data={loading ? loadingData : selectData}
          onChange={onValueChange}
          value={selected}
          placeholder={placeholder}
          className={className}
          disabled={loading || rest.disabled}
        />
      ) : (
        <Select onValueChange={onValueChange} value={selected} {...rest}>
          <SelectTrigger className={cn('w-full font-light text-gray-500 border rounded-md bg-card shadow-none ', className)}>
            <SelectValue className="" placeholder={placeholder ?? 'Select'} />
            {/* {selectData.find((dt) => dt.value === selected)?.label ?? placeholder ?? 'Select'} */}
          </SelectTrigger>
          <SelectContent>
            {loading ? (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            ) : (
              <>
                {selectData?.map((data) => {
                  return (
                    <SelectItem key={data.value} value={data.value?.toString()}>
                      {data.label}
                    </SelectItem>
                  );
                })}
              </>
            )}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default AsyncSelect;
