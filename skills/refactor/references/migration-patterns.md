# Refactoring and Migration Patterns

Common patterns for refactoring codebases. Before starting a refactor, query Unblocked
to see if the team has established patterns — use these only as fallbacks.

---

## Pattern 1: Strangler Fig

Gradually replace old implementation with new, running both in parallel until migration
is complete.

**When to use:**
- Replacing a large module or service
- Can't do a big-bang switch
- Need to migrate incrementally over multiple PRs

**Steps:**
1. Create the new implementation alongside the old
2. Route new code paths to the new implementation
3. Gradually migrate existing code paths
4. Remove the old implementation once all paths are migrated

**Implicit contracts to preserve:**
- All existing callers must continue to work throughout migration
- Error behavior must be identical during the parallel phase
- Performance characteristics should not degrade

**Query Unblocked:** "Has the team used the strangler fig pattern before? What was the approach?"

---

## Pattern 2: Extract and Delegate

Extract shared logic into a utility/module, then update callers to use it.

**When to use:**
- Duplicated logic across multiple files
- Shared patterns that should be centralized
- Creating a utility from repeated code

**Steps:**
1. Identify all instances of the duplicated logic
2. Extract the shared logic into a new module with tests
3. Update callers one at a time to use the new module
4. Verify each caller works identically after migration

**Implicit contracts to preserve:**
- Each caller's behavior must be identical before and after
- Error handling must be preserved (callers may handle errors differently)
- Performance characteristics per call site

**Query Unblocked:** "Where does the team put shared utilities? What naming conventions do they follow?"

---

## Pattern 3: Interface-First Migration

Define the target interface, adapt old implementation to it, then swap implementation.

**When to use:**
- Changing underlying implementation (e.g., database, library, protocol)
- Multiple consumers that all need the same contract
- Want to test new implementation before committing

**Steps:**
1. Define the target interface based on consumer needs
2. Adapt the old implementation to the new interface (wrapper/adapter)
3. Implement the new version against the same interface
4. Test both implementations against the same test suite
5. Switch consumers to the new implementation
6. Remove the old implementation and adapter

**Implicit contracts to preserve:**
- The interface IS the contract — define it explicitly
- Error types and semantics must match
- Performance SLAs from the old implementation

**Query Unblocked:** "Has the team defined interfaces for [area]? What patterns do they use for swapping implementations?"

---

## Pattern 4: Incremental Rename/Restructure

Rename or reorganize files/modules incrementally, keeping old paths working during transition.

**When to use:**
- Renaming modules, files, or functions
- Reorganizing directory structure
- Changing naming conventions

**Steps:**
1. Create the new structure/names
2. Add re-exports or aliases from old paths to new
3. Update callers incrementally (can be across multiple PRs)
4. Remove old paths once all callers are updated

**Implicit contracts to preserve:**
- All imports/requires must resolve throughout migration
- Build must pass at every step
- No dead imports or circular dependencies introduced

**Query Unblocked:** "Has the team done directory restructures before? Is there a migration guide?"

---

## Refactor Scoping Checklist

Before starting, confirm:

- [ ] I know **what** I'm refactoring and **why**
- [ ] I know all **consumers** of the code being refactored
- [ ] I know the team's **conventions** for this area
- [ ] I know the team's **migration direction** (if any)
- [ ] I've checked for **prior refactors** in this area
- [ ] I've listed all **implicit contracts** to preserve
- [ ] I have a **step-by-step plan** that can be reviewed incrementally
- [ ] I know how to **verify** each step preserves behavior
- [ ] **Tests exist** (or I'm writing them first)
