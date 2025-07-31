## TO DO

** Original approach was to try to get as much done as possible using basics given the time limit. With more time I would have addressed the following:


### Comments
Add more comments to explain decisions, trade-offs, etc.


### Using `Suspense` and fallback
  - Use in place of undefined check and `useEffect`/`useState` for setting table data
  - Break up `Advocates` into interactive component and async data fetching hook
  - Add error state in conjunction with `Suspense`


### Search
Add further cleanup to search input to account for user leaving out punctuation


### Pagination

#### Client
Finish logic and styling for navigating across table pages and resetting number of items per page (dependent on backend changes)

#### API
Paginated data fetching
  - Split data into smaller, more efficient chunks
  - Include info that provides total number of items for pagination UI (e.g. calculating total number of pages/current page/next page/prev page as user navigates through or changes the number of items displayed per page)
  - Include pointer to request for next and previous shards of data for navigating across pages (can subsequently be cached on the FE)


### `Table` component
Create a generic recursive data mapping of `<tr>` elements for broader types of arrays (not limited to arrays of advocates)


### `Advocates` component search function
Clean up redundant filtering logic on data


### Styling
Switch out inline styling and custom components for Tailwind versions (NOTE: I *wanted to show knowledge of CSS + HTML, along with quick personal design decisions)

Miscellaneous UX details
  - Add colors to buttons to indicate different actions
  - Add styling for disabled elements
  - Change styling to be more responsive
  - Add alternating colors to table rows for legibility


### Accessibility
Ensure UI follows accessible design principles
  - Tab order and element focus for keyboard navigation
  - Alt text and captions
  - Placeholders and labels with accurate descriptions
  - ARIA (when native element or attribute is insufficient)

Test for x-browser compatibility


### Loading + Empty State components
Change `Table` component to display skeleton in the table body when loading, and a row with "No matches found" message when search returns nothing
  - Replace current components that render outside the table


### Additional UI features
Add filtering in addition to search for categories with limited set of options or lots of common options (e.g. degrees, specialties)
  - Add query params to API request to make search/filter more efficient, and to account for paginated data
  - Add dropdowns (or similar selection components) to UI
    - PRE-API CHANGES: use similar to current search to filter available data
    - POST-API CHANGES: use filter values to populate query params when re-fetching data



