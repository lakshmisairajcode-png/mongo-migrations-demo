// MongoDB migration script for CPT document
// Works for local / dev / qa, based on which DB Jenkins connects to.

// Name of the changelog collection
const changelog = "migration_changelog";

// Unique id for this migration (must be unique per script)
const id = "20251206_update_cpt_common_v1";

// 1. Check if this migration already ran in this database
if (db.getCollection(changelog).findOne({ id })) {
  print("Already applied:", id);
  quit();
}

// 2. Apply the business change:
//    - Find document with code "CPT"
//    - Update label and name
//    - Ensure active = true
//    - Set updatedAt timestamp
db.getCollection("document_types").updateOne(
  { code: "CPT" },
  {
    $set: {
      code: "CPT",
      label: "CPT_UPDATED",
      name: "CPT_UPDATED_NAME",
      active: true,
      updatedAt: new Date()
    }
  },
  { upsert: true }  // create if not exists
);

// 3. Record this migration in changelog so it doesn't run again
db.getCollection(changelog).insertOne({
  id,
  file: "20251206_update_cpt_common.js", // update this to your actual file name
  appliedAt: new Date(),
  by: "jenkins"
});

print("Migration applied:", id);
