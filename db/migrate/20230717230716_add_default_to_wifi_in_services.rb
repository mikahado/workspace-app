class AddDefaultToWifiInServices < ActiveRecord::Migration[7.0]
  def change
    change_column_default :services, :wifi, from: nil, to: true

  end
end
