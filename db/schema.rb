# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_12_181727) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "comment"
    t.bigint "workspace_id", null: false
    t.bigint "ws_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id"], name: "index_reviews_on_workspace_id"
    t.index ["ws_user_id"], name: "index_reviews_on_ws_user_id"
  end

  create_table "services", force: :cascade do |t|
    t.string "category"
    t.boolean "wifi"
    t.text "description"
    t.bigint "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id"], name: "index_services_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "title"
    t.string "address"
    t.float "lat"
    t.float "lng"
    t.string "media"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ws_users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "reviews", "workspaces"
  add_foreign_key "reviews", "ws_users"
  add_foreign_key "services", "workspaces"
end
