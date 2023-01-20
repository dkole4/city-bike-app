/** 
 * Order of sorting.
 * 
 * ASC -       ascending sorting.
 * DESC -      descending sorting.
 * undefined - no sorting.
 */
export type Order = "ASC" | "DESC" | undefined;

/**
 * Sorting filter for lists.
 * 
 * @interface Filter
 * @member {string | undefined} name of the column to sort by.
 * @member {Order}
 */
export interface Filter {
    name: string | undefined;
    order: Order;
};

/**
 * Get the next order of the column based on the current order.
 * @param {Order} currentOrder current order of the list.
 * @returns {Order} the next order that should be applied
 */
export const getNextOrder = (currentOrder: Order): Order => {
    if (currentOrder) {
        return currentOrder === "ASC" ? "DESC" : "ASC";
    }
    return "ASC";
}