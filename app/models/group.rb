class Group < ApplicationRecord
  has_may :group_users
  has_may :users, through: :group_users
  validates :name, presence: true, uniqueness: true
end
