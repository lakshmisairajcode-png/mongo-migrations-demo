const changelog = "migration_changelog";
const id = "20251205_add_symesum_type_v1";

if (db.getCollection(changelog).findOne({ id })) {
  print("Already applied:", id);
  quit();
}

db.getCollection("document_types").updateOne(
  { code: "CPT" },
  { 
    $set: { 
      code: "CPT", 
      label: "sai", 
      active: true, 
      name: "sai",
      updatedAt: new Date() 
    } 
  },
  { upsert: true }
);

db.getCollection(changelog).insertOne({
  id,
  file: "20251205_add_symesum_type.js",
  appliedAt: new Date(),
  by: "jenkins"
});

print("Migration applied:", id);
