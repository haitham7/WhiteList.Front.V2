import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'عدد الحقول';
  customPaginatorIntl.nextPageLabel="التالي"
  customPaginatorIntl.previousPageLabel="السابق"
  
  return customPaginatorIntl;
}