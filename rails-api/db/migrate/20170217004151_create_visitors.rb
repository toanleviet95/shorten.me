class CreateVisitors < ActiveRecord::Migration[5.0]
  def change
    create_table :visitors do |t|
      t.integer :shortener_id, :null => false
      t.string :location, :null => false
      t.string :referrer, :null => false
      t.date :start_at, :null => false, :default => Time.now
      t.integer :count, :default => 1
    end
  end
end
