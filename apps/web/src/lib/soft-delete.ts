/**
 * Soft Delete Utilities
 * Provides utilities for handling soft-deleted records in Prisma
 */

/**
 * Prisma filter for including only non-deleted records
 * Use in findMany where clause: where: { ...otherFilters, ...isDeleted(false) }
 */
export const isDeleted = (deleted: boolean = false) => ({
  deletedAt: deleted ? { not: null } : null,
});

/**
 * Helper to exclude deleted records from query results
 * @param model - The Prisma model to query
 * @param where - Additional where conditions
 * @returns Filtered results excluding deleted records
 */
export const excludeDeleted = (where: any = {}) => ({
  ...where,
  deletedAt: null,
});

/**
 * Example usage for different models:
 * 
 * // Users without soft deletes
 * const activeUsers = await prisma.user.findMany({
 *   where: excludeDeleted({ role: "CLIENT" }),
 * });
 * 
 * // Projects without soft deletes
 * const activeProjects = await prisma.project.findMany({
 *   where: excludeDeleted({ clientId: "123" }),
 * });
 * 
 * // Invoices without soft deletes
 * const activeInvoices = await prisma.invoice.findMany({
 *   where: excludeDeleted({ status: "DRAFT" }),
 * });
 * 
 * // Tickets without soft deletes
 * const activeTickets = await prisma.ticket.findMany({
 *   where: excludeDeleted({ status: "OPEN" }),
 * });
 */

/**
 * Helper to perform soft delete (set deletedAt timestamp)
 * @param id - Record ID to soft delete
 * @param model - Prisma model
 */
export const softDelete = (id: string, model: any) => {
  return model.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

/**
 * Helper to restore soft deleted record (clear deletedAt timestamp)
 * @param id - Record ID to restore
 * @param model - Prisma model
 */
export const restoreSoftDelete = (id: string, model: any) => {
  return model.update({
    where: { id },
    data: { deletedAt: null },
  });
};
