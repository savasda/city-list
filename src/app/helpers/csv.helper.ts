export function parseCSV(csvString: string): Array<Record<string, any>> {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());

  return lines.slice(1).map(line => {
    return line.split(',').reduce((acc: Record<string, any>, value, i) => {
      let parsedValue: any = value.trim();

      // Attempt to convert values to numbers if possible
      if (!isNaN(value as any)) {
        parsedValue = +value;
      } else if (value.startsWith('"') && value.endsWith('"')) {
        parsedValue = value.slice(1, -1);
      }

      acc[headers[i]] = parsedValue;
      return acc;
    }, {});
  });
}
