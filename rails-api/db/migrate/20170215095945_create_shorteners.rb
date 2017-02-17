class CreateShorteners < ActiveRecord::Migration[5.0]
  def change
    create_table :shorteners do |t|
      t.string :given_url, :unique => true
      t.string :title
      t.string :slug, :unique => true
      t.integer :count, :default => 0

      t.timestamps
    end
  end
end
