# Refactoring and Migration Patterns

Before starting a refactor, query Unblocked for team-established patterns — use these as fallbacks.

---

## Pattern 1: Strangler Fig

Gradually replace old implementation with new, running both in parallel.

**When to use:** Replacing a large module/service, can't do big-bang, need incremental migration.

**Steps:**
1. Create new implementation alongside old
2. Route new code paths to new implementation
3. Gradually migrate existing paths
4. Remove old implementation when complete

**Contracts to preserve:** All callers work throughout, error behavior identical, no performance degradation.

---

## Pattern 2: Extract and Delegate

Extract shared logic into a utility/module, update callers.

**When to use:** Duplicated logic, shared patterns needing centralization.

**Steps:**
1. Identify all instances of duplicated logic
2. Extract to new module with tests
3. Update callers one at a time
4. Verify identical behavior per caller

**Contracts to preserve:** Each caller's behavior identical, error handling preserved, per-site performance.

---

## Pattern 3: Interface-First Migration

Define target interface, adapt old implementation, swap.

**When to use:** Changing underlying implementation (database, library, protocol), multiple consumers.

**Steps:**
1. Define target interface from consumer needs
2. Adapt old implementation to new interface (wrapper)
3. Implement new version against same interface
4. Test both against same test suite
5. Switch consumers
6. Remove old implementation and adapter

**Contracts to preserve:** Interface IS the contract, error semantics match, performance SLAs met.

---

## Pattern 4: Incremental Rename/Restructure

Rename or reorganize incrementally, keeping old paths working.

**When to use:** Renaming modules/files, reorganizing directories, changing naming conventions.

**Steps:**
1. Create new structure/names
2. Add re-exports or aliases from old to new
3. Update callers incrementally
4. Remove old paths when all callers updated

**Contracts to preserve:** All imports resolve, build passes at every step, no dead imports or cycles.

---

## Refactor Scoping Checklist

- [ ] I know **what** and **why**
- [ ] I know all **consumers**
- [ ] I know team **conventions** for this area
- [ ] I know team **migration direction** (if any)
- [ ] I've checked for **prior refactors**
- [ ] I've listed all **implicit contracts**
- [ ] I have a **step-by-step plan** reviewable incrementally
- [ ] I know how to **verify** each step
- [ ] **Tests exist** (or I'm writing them first)
