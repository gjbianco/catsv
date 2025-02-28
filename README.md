# catsv

Print out contents of a CSV file in table format.

Provides the following flags for controlling output:

-   `--width <number>` will truncate each cell to the specified width.
    Does not truncate headers.

-   `--include <fields>` will only include the specified fields, separated by comma.
    Displays all fields if not specified.

Built using the [Bun](https://bun.sh) JavaScript runtime.
However, the provided binary releases do not depend on having Bun installed.
